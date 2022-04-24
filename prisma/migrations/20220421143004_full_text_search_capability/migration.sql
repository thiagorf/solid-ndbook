-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);


ALTER TABLE "Book"
    ADD COLUMN "textsearch" tsvector
               GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))) STORED;

CREATE INDEX "textsearch_idx" ON "Book"
    USING GIN ("textsearch");

