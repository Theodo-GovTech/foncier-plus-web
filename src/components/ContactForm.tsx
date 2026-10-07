"use client";

import { useTranslations } from "next-intl";
import { type SubmitEvent, useId } from "react";
import { ContactFormButton } from "@/components/ContactFormButton";
import { MailIcon } from "@/components/icons/MailIcon";
import { buildMailtoUrl, CONTACT_EMAIL } from "@/lib/contact";

const inputClassName =
  "h-12 w-full border border-line bg-white px-[17px] text-[15px] text-brand outline-none placeholder:text-muted focus:border-brand";

const labelClassName = "mb-2 block text-[15px] font-semibold text-brand";

const hintClassName = "mt-1 text-xs text-muted";

const safeTextRegex = (maxLength: number) =>
  `[a-zA-Z0-9àâäéèêëîïôöùûüÿçÆæŒœ\\s'’\\-]{0,${maxLength}}`;

const COMPANY_MAX_LENGTH = 100;
const NAME_MAX_LENGTH = 255;
const ROLE_MAX_LENGTH = 100;

const MAIL_ICON_SIZE = 20;

const FIELD_NAMES = {
  company: "company",
  name: "name",
  role: "role",
} as const;

export const ContactForm = () => {
  const tForm = useTranslations("ContactPage.contactForm");
  const tEmail = useTranslations("ContactPage.email");
  const companyInputId = useId();
  const nameInputId = useId();
  const roleInputId = useId();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const contactFormData = new FormData(event.currentTarget);
    const body = tEmail("body", {
      company: String(contactFormData.get(FIELD_NAMES.company) ?? ""),
      name: String(contactFormData.get(FIELD_NAMES.name) ?? ""),
      role: String(contactFormData.get(FIELD_NAMES.role) ?? ""),
    });
    window.location.href = buildMailtoUrl(
      CONTACT_EMAIL,
      tEmail("subject"),
      body,
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="flex max-w-2xl flex-col gap-6">
        <div>
          <label htmlFor={companyInputId} className={labelClassName}>
            {tForm("companyLabel")}
          </label>
          <input
            id={companyInputId}
            name={FIELD_NAMES.company}
            type="text"
            maxLength={COMPANY_MAX_LENGTH}
            pattern={safeTextRegex(COMPANY_MAX_LENGTH)}
            autoComplete="organization"
            placeholder={tForm("companyPlaceholder")}
            aria-describedby={`${companyInputId}-hint`}
            className={inputClassName}
          />
          <p id={`${companyInputId}-hint`} className={hintClassName}>
            {tForm("hint", { max: COMPANY_MAX_LENGTH })}
          </p>
        </div>
        <div>
          <label htmlFor={nameInputId} className={labelClassName}>
            {tForm("nameLabel")}
          </label>
          <input
            id={nameInputId}
            name={FIELD_NAMES.name}
            type="text"
            maxLength={NAME_MAX_LENGTH}
            pattern={safeTextRegex(NAME_MAX_LENGTH)}
            autoComplete="name"
            placeholder={tForm("namePlaceholder")}
            aria-describedby={`${nameInputId}-hint`}
            className={inputClassName}
          />
          <p id={`${nameInputId}-hint`} className={hintClassName}>
            {tForm("hint", { max: NAME_MAX_LENGTH })}
          </p>
        </div>
        <div>
          <label htmlFor={roleInputId} className={labelClassName}>
            {tForm("roleLabel")}
          </label>
          <input
            id={roleInputId}
            name={FIELD_NAMES.role}
            type="text"
            maxLength={ROLE_MAX_LENGTH}
            pattern={safeTextRegex(ROLE_MAX_LENGTH)}
            autoComplete="organization-title"
            placeholder={tForm("rolePlaceholder")}
            aria-describedby={`${roleInputId}-hint`}
            className={inputClassName}
          />
          <p id={`${roleInputId}-hint`} className={hintClassName}>
            {tForm("hint", { max: ROLE_MAX_LENGTH })}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <ContactFormButton>
          {tForm("cta")}
          <MailIcon
            width={MAIL_ICON_SIZE}
            height={MAIL_ICON_SIZE}
            aria-hidden="true"
          />
        </ContactFormButton>
      </div>
      <p className="mt-4 text-[15px] text-brand">
        {tForm("note", { email: CONTACT_EMAIL })}
      </p>
    </form>
  );
};
