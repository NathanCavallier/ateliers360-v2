import {
  getRequestConfig,
  type GetRequestConfigParams,
  type RequestConfig,
} from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(
  async (
    params: GetRequestConfigParams
  ): Promise<RequestConfig> => {
    const requestLocale = await params.requestLocale;
    const locale =
      typeof requestLocale === 'string'
        ? requestLocale
        : typeof params.locale === 'string'
        ? params.locale
        : undefined;

    const localeValue =
      locale &&
      routing.locales.includes(locale as typeof routing.locales[number])
        ? locale
        : routing.defaultLocale;

    return {
      locale: localeValue,
      messages: (await import(`../messages/${localeValue}.json`)).default,
    };
  }
);
