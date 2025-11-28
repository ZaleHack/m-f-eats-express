const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export type FormType =
  | "partner_application"
  | "driver_application"
  | "restaurant_profile"
  | "restaurant_menu_item";

export async function submitFormToMysql(formType: FormType, data: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/forms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, data }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Impossible d'enregistrer le formulaire dans MySQL");
  }

  return response.json() as Promise<{ id: number }>;
}
