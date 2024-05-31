revoke delete on table "public"."education_skills" from "anon";

revoke insert on table "public"."education_skills" from "anon";

revoke references on table "public"."education_skills" from "anon";

revoke select on table "public"."education_skills" from "anon";

revoke trigger on table "public"."education_skills" from "anon";

revoke truncate on table "public"."education_skills" from "anon";

revoke update on table "public"."education_skills" from "anon";

revoke delete on table "public"."education_skills" from "authenticated";

revoke insert on table "public"."education_skills" from "authenticated";

revoke references on table "public"."education_skills" from "authenticated";

revoke select on table "public"."education_skills" from "authenticated";

revoke trigger on table "public"."education_skills" from "authenticated";

revoke truncate on table "public"."education_skills" from "authenticated";

revoke update on table "public"."education_skills" from "authenticated";

revoke delete on table "public"."education_skills" from "service_role";

revoke insert on table "public"."education_skills" from "service_role";

revoke references on table "public"."education_skills" from "service_role";

revoke select on table "public"."education_skills" from "service_role";

revoke trigger on table "public"."education_skills" from "service_role";

revoke truncate on table "public"."education_skills" from "service_role";

revoke update on table "public"."education_skills" from "service_role";

revoke delete on table "public"."project_skills" from "anon";

revoke insert on table "public"."project_skills" from "anon";

revoke references on table "public"."project_skills" from "anon";

revoke select on table "public"."project_skills" from "anon";

revoke trigger on table "public"."project_skills" from "anon";

revoke truncate on table "public"."project_skills" from "anon";

revoke update on table "public"."project_skills" from "anon";

revoke delete on table "public"."project_skills" from "authenticated";

revoke insert on table "public"."project_skills" from "authenticated";

revoke references on table "public"."project_skills" from "authenticated";

revoke select on table "public"."project_skills" from "authenticated";

revoke trigger on table "public"."project_skills" from "authenticated";

revoke truncate on table "public"."project_skills" from "authenticated";

revoke update on table "public"."project_skills" from "authenticated";

revoke delete on table "public"."project_skills" from "service_role";

revoke insert on table "public"."project_skills" from "service_role";

revoke references on table "public"."project_skills" from "service_role";

revoke select on table "public"."project_skills" from "service_role";

revoke trigger on table "public"."project_skills" from "service_role";

revoke truncate on table "public"."project_skills" from "service_role";

revoke update on table "public"."project_skills" from "service_role";

alter table "public"."education_skills" drop constraint "education_skills_education_id_fkey";

alter table "public"."education_skills" drop constraint "education_skills_skill_id_fkey";

alter table "public"."project_skills" drop constraint "project_skills_project_id_fkey";

alter table "public"."project_skills" drop constraint "project_skills_skill_id_fkey";

drop table "public"."education_skills";

drop table "public"."project_skills";

create table "public"."stack" (
    "project_id" uuid not null,
    "skill_id" uuid not null
);


alter table "public"."education" alter column "stack" set not null;

alter table "public"."education" alter column "stack" set data type text using "stack"::text;

alter table "public"."projects" drop column "stack";

CREATE UNIQUE INDEX skills_name_key ON public.skills USING btree (name);

CREATE UNIQUE INDEX stack_pkey ON public.stack USING btree (project_id, skill_id);

alter table "public"."stack" add constraint "stack_pkey" PRIMARY KEY using index "stack_pkey";

alter table "public"."skills" add constraint "skills_name_key" UNIQUE using index "skills_name_key";

alter table "public"."stack" add constraint "public_stack_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."stack" validate constraint "public_stack_project_id_fkey";

alter table "public"."stack" add constraint "public_stack_skill_id_fkey" FOREIGN KEY (skill_id) REFERENCES skills(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."stack" validate constraint "public_stack_skill_id_fkey";

grant delete on table "public"."stack" to "anon";

grant insert on table "public"."stack" to "anon";

grant references on table "public"."stack" to "anon";

grant select on table "public"."stack" to "anon";

grant trigger on table "public"."stack" to "anon";

grant truncate on table "public"."stack" to "anon";

grant update on table "public"."stack" to "anon";

grant delete on table "public"."stack" to "authenticated";

grant insert on table "public"."stack" to "authenticated";

grant references on table "public"."stack" to "authenticated";

grant select on table "public"."stack" to "authenticated";

grant trigger on table "public"."stack" to "authenticated";

grant truncate on table "public"."stack" to "authenticated";

grant update on table "public"."stack" to "authenticated";

grant delete on table "public"."stack" to "service_role";

grant insert on table "public"."stack" to "service_role";

grant references on table "public"."stack" to "service_role";

grant select on table "public"."stack" to "service_role";

grant trigger on table "public"."stack" to "service_role";

grant truncate on table "public"."stack" to "service_role";

grant update on table "public"."stack" to "service_role";


