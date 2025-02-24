import { z } from 'zod';

const ACCEPETE_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 2000000; // 2mb

export const updateProfileSchema = z.object({
  image: z
    .any()
    .refine(
      (file) => !file || ACCEPETE_IMAGE_TYPES.includes(file.type),
      'File harus berupa gambar (jpeg, jpg, atau png)',
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Ukuran file tidak boleh lebih dari 2MB',
    )
    .optional(),
  displayName: z.string({ required_error: 'Display name is required' }),
  gender: z.string({
    required_error: 'Gender is required',
  }),
  birthday: z.coerce.date({ required_error: 'Birthday is required' }),
  horoscope: z.string().optional(),
  zodiac: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
