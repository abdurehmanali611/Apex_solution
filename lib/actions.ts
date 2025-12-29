/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface cloudinarySuccessResult {
  event: "success";
  info: {
    secure_url: string;
  };
}

const api = "http://localhost:4000/graphql"

export const handleUploadSuccess = (
  result: unknown,
  form: UseFormReturn<any>,
  setPreviewUrl: (url: string | null) => void,
  formField: string
) => {
  if (
    typeof result == "object" &&
    result !== null &&
    "event" in result &&
    result.event == "success" &&
    "info" in result &&
    typeof result.info == "object" &&
    result.info !== null &&
    "secure_url" in result.info
  ) {
    const typedResult = result as cloudinarySuccessResult;
    const secured_url = typedResult.info.secure_url;

    form.setValue(formField, secured_url, { shouldValidate: true });
    setPreviewUrl(secured_url);
  } else {
    console.error(
      "Cloudinary Upload Failed or returned an unexpected structure."
    );

    form.setValue(formField, "");
    setPreviewUrl(null);
  }
};

export async function handleLoginAdmin(values: any, setIsLoading: (loading: boolean) => void, router: AppRouterInstance) {
  router.push('/AdminDashboard')
}