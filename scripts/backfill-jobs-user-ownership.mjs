// Backfill job ownership from the legacy magic-link JobEmployer onto directory
// User accounts, matched by email. Run AFTER the 20260710120000 migration is
// applied. Idempotent: re-running only fills rows still missing user_id.
//
//   DOTENV_CONFIG_PATH=.env.local node -r dotenv/config scripts/backfill-jobs-user-ownership.mjs
//
// Employers whose email has NO directory User are reported and skipped (their
// jobs stay owner-less until that person signs up / sets a password with the
// same email, at which point re-running links them).

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const employers = await prisma.jobEmployer.findMany();
  const unmatched = [];
  let linkedJobs = 0;
  let linkedPayments = 0;

  for (const emp of employers) {
    const user = await prisma.user.findUnique({ where: { email: emp.email } });
    if (!user) {
      const jobCount = await prisma.job.count({ where: { employer_id: emp.id } });
      unmatched.push({ email: emp.email, employerId: emp.id, jobCount });
      continue;
    }
    const j = await prisma.job.updateMany({
      where: { employer_id: emp.id, user_id: null },
      data: { user_id: user.id },
    });
    const p = await prisma.jobPayment.updateMany({
      where: { employer_id: emp.id, user_id: null },
      data: { user_id: user.id },
    });
    linkedJobs += j.count;
    linkedPayments += p.count;
    if (j.count || p.count) {
      console.log(`Linked employer ${emp.email} → user#${user.id}: ${j.count} jobs, ${p.count} payments`);
    }
  }

  console.log(`\nDone. Linked ${linkedJobs} jobs and ${linkedPayments} payments.`);
  if (unmatched.length) {
    console.log(`\n${unmatched.length} employer(s) have NO matching directory account (jobs left owner-less):`);
    for (const u of unmatched) console.log(`  - ${u.email} (employer#${u.employerId}, ${u.jobCount} jobs)`);
  }
}

main()
  .catch((e) => {
    console.error("Backfill failed:", e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
