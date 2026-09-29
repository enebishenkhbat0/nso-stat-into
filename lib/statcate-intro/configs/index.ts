import type { IntroDashboardConfig } from "@/lib/statcate-intro/types";
import { monasteries } from "@/lib/statcate-intro/configs/monasteries";
import { poverty } from "@/lib/statcate-intro/configs/poverty";
import { socialInsurance } from "@/lib/statcate-intro/configs/social-insurance";
import { sdg } from "@/lib/statcate-intro/configs/sdg";
import { householdIncomeExpense } from "@/lib/statcate-intro/configs/household-income";
import { humanDevelopmentIndex } from "@/lib/statcate-intro/configs/humanDevelopmentIndex";
import { crime } from "@/lib/statcate-intro/configs/crime";
import { higherEducationGenderRatio } from "@/lib/statcate-intro/configs/higher-education-gender-ratio";

/**
 * Шинэ салбар нэмэх:
 * 1. configs/<id>.ts дээр хүснэгт, хэмжээс, widget-ээ зарлана
 * 2. тэр config-оо энэ жагсаалтад хийнэ
 */
export const INTRO_CONFIGS: IntroDashboardConfig[] = [
  monasteries,
  poverty,
  socialInsurance,
  sdg,
  householdIncomeExpense,
  humanDevelopmentIndex,
  crime,
  higherEducationGenderRatio,
];