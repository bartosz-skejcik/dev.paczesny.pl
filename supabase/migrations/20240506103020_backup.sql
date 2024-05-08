alter table "public"."admin_statistics" alter column "last_order_date" set default now();

alter table "public"."client_feedback" alter column "feedback_date" set default now();

alter table "public"."client_statistics" alter column "last_order_date" set default now();

alter table "public"."notifications" alter column "notification_date" set default now();

alter table "public"."order_history" alter column "update_date" set default now();

alter table "public"."payment_transactions" alter column "transaction_date" set default now();


