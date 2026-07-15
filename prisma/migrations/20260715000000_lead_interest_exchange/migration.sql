-- Lead interest / contact-exchange flow.
-- New contractor response statuses: business expresses "interested", then logs a
-- post-connection outcome ("won" / "not_proceeded"). Existing values are kept.
ALTER TYPE "ContractorResponseStatus" ADD VALUE IF NOT EXISTS 'interested';
ALTER TYPE "ContractorResponseStatus" ADD VALUE IF NOT EXISTS 'won';
ALTER TYPE "ContractorResponseStatus" ADD VALUE IF NOT EXISTS 'not_proceeded';

-- Records when the client proceeds with a specific business. Until this is set,
-- the client's contact details stay hidden from the business; once set, contact
-- is exchanged both ways and the outcome tracker unlocks.
ALTER TABLE "quote_request_deliveries" ADD COLUMN IF NOT EXISTS "client_requested_at" TIMESTAMP(3);
