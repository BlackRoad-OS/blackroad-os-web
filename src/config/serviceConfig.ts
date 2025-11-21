export const SERVICE_ID = 'web';
export const SERVICE_NAME = 'BlackRoad OS – Web';
export const SERVICE_BASE_URL = process.env.SERVICE_BASE_URL || 'https://blackroad.systems';
export const OS_ROOT = process.env.OS_ROOT || 'https://blackroad.systems';

export const serviceConfig = {
  SERVICE_ID,
  SERVICE_NAME,
  SERVICE_BASE_URL,
  OS_ROOT
};

export type ServiceConfig = typeof serviceConfig;
