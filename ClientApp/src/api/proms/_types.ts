export type FormStatus = 'Pending' | 'Completed' | 'Declined' | 'Expired';

export interface FormRequest {
  id: string;
  christieNumber: string;
  formName: string;
  formVersion: string;
  status: FormStatus;
  token: string;
  sentAt: Date;
  submissionDueAt: Date;
  reminderSentAt?: Date | null;
  completedAt?: Date | null;
  declinedAt?: Date | null;
  compositionId?: string | null;
}
