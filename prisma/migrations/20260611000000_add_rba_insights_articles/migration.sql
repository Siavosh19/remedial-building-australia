CREATE TABLE IF NOT EXISTS "rba_insights_articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT,
    "featured_image_url" TEXT,
    "featured_image_alt_text" TEXT,
    "body_content" TEXT,
    "author" TEXT NOT NULL DEFAULT 'Remedial Building Australia',
    "published_date" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'draft',
    "seo_title" TEXT,
    "seo_description" TEXT,
    "related_defect_pages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "related_repair_systems" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "reading_time_minutes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rba_insights_articles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "rba_insights_articles_slug_key" ON "rba_insights_articles"("slug");
CREATE INDEX IF NOT EXISTS "rba_insights_articles_status_idx" ON "rba_insights_articles"("status");
