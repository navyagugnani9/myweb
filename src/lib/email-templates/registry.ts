import type { ComponentType } from 'react'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

import { template as formNotification } from './form-notification'
import { template as talentCardRequest } from './talent-card-request'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'form-notification': formNotification,
  'talent-card-request': talentCardRequest,
}
