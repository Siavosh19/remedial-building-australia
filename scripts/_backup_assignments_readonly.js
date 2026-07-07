// READ-ONLY backup of current category assignments for rollback. No writes.
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

(async () => {
  const companies = await prisma.company.findMany({
    select: { id: true, main_category_id: true, status: true },
  });
  const compCats = await prisma.companyCategory.findMany({
    select: { id: true, company_id: true, category_id: true, is_primary: true, is_approved: true },
  });
  const cats = await prisma.category.findMany({
    select: { id: true, name: true, slug: true, parent_id: true, display_order: true, is_active: true },
  });
  const stamp = process.argv[2] || 'backup';
  const out = { companies, compCats, cats, counts: {
    companies: companies.length, compCats: compCats.length, cats: cats.length } };
  const path = `/tmp/category_backup_${stamp}.json`;
  fs.writeFileSync(path, JSON.stringify(out));
  console.log('BACKUP written:', path);
  console.log('companies:', companies.length, '| company_categories:', compCats.length, '| categories:', cats.length);
  console.log('companies with main_category_id:', companies.filter(c=>c.main_category_id!=null).length);
  await prisma.$disconnect();
})().catch(async e => { console.error('ERR', e.message); await prisma.$disconnect(); process.exit(1); });
