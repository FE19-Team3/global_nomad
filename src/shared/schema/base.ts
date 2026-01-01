import { z } from 'zod';

import { Id, ISODateTime } from '@/shared/schema/primitives';

export const BaseEntity = z.object({
  id: Id,
  createdAt: ISODateTime,
  updatedAt: ISODateTime,
});

// deletedAt 필드를 위한 소프트 삭제 메타데이터
export const SoftDeleteMeta = z.object({
  deletedAt: ISODateTime.nullable(),
});
