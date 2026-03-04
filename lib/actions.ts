/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { current } from "@/Components/AdminHeroFooter";
import { services } from "@/Components/AdminServices";
import { portfolio } from "@/Components/AdminPortFolios";
import { blogs } from "@/Components/AdminBlogs";
import { teamprop } from "@/Components/AdminTeams";
import { partner } from "@/Components/AdminPartners";
import { contact } from "@/Components/AdminContact";
import { testimony } from "@/Components/AdminTestimonial";

interface cloudinarySuccessResult {
  event: "success";
  info: {
    secure_url: string;
  };
}

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const handleUploadSuccess = (
  result: unknown,
  form: UseFormReturn<any>,
  setPreviewUrl: (url: string | null) => void,
  formField: string,
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
      "Cloudinary Upload Failed or returned an unexpected structure.",
    );

    form.setValue(formField, "");
    setPreviewUrl(null);
  }
};

export async function LoginUser(
  values: any,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/auth/login", values);
    const { token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function HeroFooterFetch() {
  try {
    const response = await api.get("/heroFooter");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function HeroFooterUpdate(
  values: current,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const name = values.name;
    const amount = values.amount;
    const response = await api.patch(`/heroFooter/${name}`, {
      amount: amount,
    });
    const data = response.data;
    toast.success(`${name} updated successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function CreateService(
  values: services,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/services", values);
    const data = response.data;
    toast.success(`${values.title} created successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function GetService() {
  try {
    const response = await api.get("/services");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function UpdateService(
  id: number,
  values: services,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/services/${id}`, values);
    const data = response.data;
    toast.success(`${values.title} updated successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function DeleteService(id: number) {
  try {
    const response = await api.delete(`/services/${id}`);
    const data = response.data;
    toast.success(`${data.title} deleted successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function CreatePortFolio(
  values: portfolio,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/portfolio", values);
    const data = response.data;
    toast.success(`${values.title} created successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function GetPortFolio() {
  try {
    const response = await api.get("/portfolio");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function UpdatePortFolio(
  id: number,
  values: portfolio,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/portfolio/${id}`, values);
    const data = response.data;
    toast.success(`${values.title} updated successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function DeletePortFolio(id: number) {
  try {
    const response = await api.delete(`/portfolio/${id}`);
    const data = response.data;
    toast.success(`${data.title} deleted successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function CreateBlog(
  values: blogs,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/blogs", values);
    const data = response.data;
    toast.success(`${values.title} created successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function GetBlog() {
  try {
    const response = await api.get("/blogs");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function UpdateBlog(
  id: number,
  values: blogs,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/blogs/${id}`, values);
    const data = response.data;
    toast.success(`${values.title} updated successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function DeleteBlog(id: number) {
  try {
    const response = await api.delete(`/blogs/${id}`);
    const data = response.data;
    toast.success(`${data.title} deleted successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function CreateTeam(
  values: teamprop,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/teams", values);
    const data = response.data;
    toast.success(`${values.name} created successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function GetTeam() {
  try {
    const response = await api.get("/teams");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function UpdateTeam(
  id: number,
  values: teamprop,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/teams/${id}`, values);
    const data = response.data;
    toast.success(`${values.name} updated successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function DeleteTeam(id: number) {
  try {
    const response = await api.delete(`/teams/${id}`);
    const data = response.data;
    toast.success(`${data.name} deleted successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function CreatePartner(
  values: partner,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/partners", values);
    const data = response.data;
    toast.success(`${values.title} created successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function GetPartner() {
  try {
    const response = await api.get("/partners");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function UpdatePartner(
  id: number,
  values: partner,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/partners/${id}`, values);
    const data = response.data;
    toast.success(`${values.title} updated successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function DeletePartner(id: number) {
  try {
    const response = await api.delete(`/partners/${id}`);
    const data = response.data;
    toast.success(`${data.title} deleted successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function CreateContact(
  values: contact,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/contacts", values);
    const data = response.data;
    toast.success(`Message Sent successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function GetContact() {
  try {
    const response = await api.get("/contacts");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function DeleteContact(id: number) {
  try {
    const response = await api.delete(`/contacts/${id}`);
    const data = response.data;
    toast.success(`Message deleted successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function CreateTestimonial(
  values: testimony,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/testimonials", values);
    const data = response.data;
    toast.success(`${values.name} created successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function GetTestimonial() {
  try {
    const response = await api.get("/testimonials");
    const data = response.data;
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}

export async function UpdateTestimonial(
  id: number,
  values: testimony,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/testimonials/${id}`, values);
    const data = response.data;
    toast.success(`${values.name} updated successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  } finally {
    setLoading(false);
  }
}

export async function DeleteTestimonial(id: number) {
  try {
    const response = await api.delete(`/testimonials/${id}`);
    const data = response.data;
    toast.success(`${data.name} deleted successfully`);
    return data;
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast.error(`${errorMessage}`);
  }
}
