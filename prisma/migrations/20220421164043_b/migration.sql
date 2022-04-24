-- AlterTable
ALTER TABLE "Book"
    ADD COLUMN "textsearch" tsvector
               GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))) STORED;


-- CreateIndex
CREATE INDEX "Book_textsearch_idx" ON "Book" USING GIN ("textsearch");


