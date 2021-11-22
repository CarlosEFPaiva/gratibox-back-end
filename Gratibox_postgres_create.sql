CREATE TABLE "login" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "login_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subscribers" (
	"id" serial NOT NULL,
	"login_id" integer NOT NULL,
	"deliver_date_id" integer NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"subscription_date" DATE,
	"adress" TEXT NOT NULL,
	"zip_code" integer NOT NULL,
	"city_id" integer NOT NULL,
	"state_id" integer NOT NULL,
	CONSTRAINT "subscribers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "deliver_dates" (
	"id" serial NOT NULL,
	"plan_id" integer NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "deliver_dates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "products" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "subscribers_and_products" (
	"id" serial NOT NULL,
	"subscriber_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	CONSTRAINT "subscribers_and_products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "cities" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "cities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "states" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "states_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"login_id" integer NOT NULL,
	"token" uuid NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_fk0" FOREIGN KEY ("login_id") REFERENCES "login"("id");
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_fk1" FOREIGN KEY ("deliver_date_id") REFERENCES "deliver_dates"("id");
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_fk2" FOREIGN KEY ("city_id") REFERENCES "cities"("id");
ALTER TABLE "subscribers" ADD CONSTRAINT "subscribers_fk3" FOREIGN KEY ("state_id") REFERENCES "states"("id");


ALTER TABLE "deliver_dates" ADD CONSTRAINT "deliver_dates_fk0" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");


ALTER TABLE "subscribers_and_products" ADD CONSTRAINT "subscribers_and_products_fk0" FOREIGN KEY ("subscriber_id") REFERENCES "subscribers"("id");
ALTER TABLE "subscribers_and_products" ADD CONSTRAINT "subscribers_and_products_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("id");



ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("login_id") REFERENCES "login"("id");









