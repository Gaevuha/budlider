"use server";

import { revalidatePath } from "next/cache";

export async function submitOrder(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  // Тут можна зробити запис у БД, відправку на API, email тощо
  console.log("ORDER:", { name, email, phone, address });

  // Наприклад, після замовлення можна оновити сторінку
  revalidatePath("/cart");

  return { success: true };
}
