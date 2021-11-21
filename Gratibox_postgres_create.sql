CREATE TABLE "public.signin" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" uuid NOT NULL UNIQUE,
	CONSTRAINT "signin_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"login_name" varchar(255) NOT NULL,
	"plan_id" integer NOT NULL,
	"deliver_date_id" integer NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"subscription_date" DATE,
	"adress" TEXT NOT NULL,
	"zip_code" integer NOT NULL,
	"city_id" integer NOT NULL,
	"state_id" integer NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.plans" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.deliver_dates" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "deliver_dates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.products" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.users_and_products" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"product_id" serial NOT NULL,
	CONSTRAINT "users_and_products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cities" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "cities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.states" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "states_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" uuid NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "signin" ADD CONSTRAINT "signin_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("plan_id") REFERENCES "plans"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("deliver_date_id") REFERENCES "deliver_dates"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk2" FOREIGN KEY ("city_id") REFERENCES "cities"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk3" FOREIGN KEY ("state_id") REFERENCES "states"("id");




ALTER TABLE "users_and_products" ADD CONSTRAINT "users_and_products_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_and_products" ADD CONSTRAINT "users_and_products_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("id");



ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");










