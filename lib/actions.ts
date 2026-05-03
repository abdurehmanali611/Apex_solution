/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { HeroFooterItem } from "@/constants";

interface cloudinarySuccessResult {
  event: "success";
  info: {
    secure_url: string;
  };
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://apex-backend-tdth.vercel.app/api",
  timeout: 3000,
});

const AUTH_COOKIE_NAME = "apex_admin_token";

const toast = {
  error: (message: string) => {
    if (typeof window === "undefined") {
      return;
    }
    import("sonner")
      .then((mod) => mod.toast.error(message))
      .catch((err) => console.error("Toast import failed", err));
  },
  success: (message: string) => {
    if (typeof window === "undefined") {
      return;
    }
    import("sonner")
      .then((mod) => mod.toast.success(message))
      .catch((err) => console.error("Toast import failed", err));
  },
};

function setAuthCookie(token: string) {
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL || "https://apex-backend-tdth.vercel.app/api"}/auth/token/refresh`,
      { refresh: refreshToken }
    );

    const { access } = response.data;
    localStorage.setItem("token", access);
    setAuthCookie(access);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    return access;
  } catch (error) {
    void error;
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    clearAuthCookie();
    delete api.defaults.headers.common["Authorization"];
    throw error;
  }
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const url = config.url ?? "";
    const isAuthLogin = url.endsWith("/auth/login");
    if (isAuthLogin) {
      config.headers.delete('Authorization');
    } else if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorCode = error.response?.data?.code;

    if (typeof window !== "undefined" && errorCode === "token_not_valid" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/Builder";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export interface Services {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface createService {
  icon: string;
  title: string;
  description: string;
}

export interface UpdateServices extends createService {
  id: number;
}

export interface portfolio {
  id: number
  image?: string;
  title: string;
  description: string;
  type: string;
  version?: number;
  duration: number;
  link?: string;
  special?: boolean;
}

export interface createPortfolios {
  image?: string;
  title: string;
  description: string;
  type: string;
  version?: number;
  duration: number;
  link?: string;
  special?: boolean;
}

export interface UpdatePortfolios extends createPortfolios {
  id: number;
}

export interface blogs {
  id: number;
  image: string;
  link: string;
  title: string;
  description: string;
  source: string;
  date: string;
}

export interface createBlogs {
  image: string;
  link: string;
  title: string;
  description: string;
  source: string;
  date: string;
}

export interface UpdateBlogs extends createBlogs {
  id: number;
}

export interface teams {
  id: number;
  image: string;
  name: string;
  position: string;
  title: string;
  description: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
}

export interface createTeams {
  image: string;
  name: string;
  position: string;
  title: string;
  description: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  telegram: string;
}

export interface UpdateTeams extends createTeams {
  id: number;
}

export interface partner {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface CreatePartners {
  image: string;
  title: string;
  description: string;
}

export interface UpdatePartners extends CreatePartners {
  id: number;
}

export interface contact {
  id: number;
  Full_Name: string;
  Email: string;
  Subject: string;
  Message: string;
}

export interface createContacts {
  Full_Name: string;
  Email: string;
  Subject: string;
  Message: string;
}

export interface UpdateContacts extends createContacts {
  id: number;
}

export interface testimony {
  id: number;
  name: string;
  profession: string;
  image: string;
  content: string;
  rating: number;
}

export interface createTestimonys {
  name: string;
  profession: string;
  image: string;
  content: string;
  rating: number;
}

export interface UpdateTestimonys extends createTestimonys {
  id: number;
}

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
  router: AppRouterInstance
) {
  try {
    setLoading(true);
    const response = await api.post("/auth/login", values);
    const { token, refresh } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
    setAuthCookie(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    router.push("/BuilderDashboard")
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

export async function LogoutUser(router: AppRouterInstance) {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    clearAuthCookie();
    delete api.defaults.headers.common["Authorization"];
    router.push("/Builder");
    toast.success("Logged out successfully");
  } catch (error) {
    void error;
    toast.error("Error during logout");
  }
}

export async function HeroFooterFetch() {
  try {
    const response = await api.get("/heroFooter/");
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
  values: HeroFooterItem,
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
  values: createService,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/services/", values);
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
    const response = await api.get("/services/");
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
  values: UpdateServices,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/services/${values.id}`, values);
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
    toast.success("Service deleted successfully");
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
  values: createPortfolios,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/portfolio/", values);
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
    const response = await api.get("/portfolio/");
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
  values: UpdatePortfolios,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/portfolio/${values.id}`, values);
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
    toast.success("Portfolio deleted successfully");
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
  values: createBlogs,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/blogs/", values);
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
    const response = await api.get("/blogs/");
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
  values: UpdateBlogs,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/blogs/${values.id}`, values);
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
    toast.success("Blog deleted successfully");
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
  values: createTeams,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/teams/", values);
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
    const response = await api.get("/teams/");
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
  values: UpdateTeams,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/teams/${values.id}`, values);
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
    toast.success("Team member deleted successfully");
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
  values: CreatePartners,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/partners/", values);
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
    const response = await api.get("/partners/");
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
  values: UpdatePartners,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/partners/${values.id}`, values);
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
    toast.success("Partner deleted successfully");
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
  values: createContacts,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/contacts/", values);
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
    const response = await api.get("/contacts/");
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
    toast.success("Message deleted successfully");
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
  values: createTestimonys,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/testimonials/", values);
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
    const response = await api.get("/testimonials/");
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
  values: UpdateTestimonys,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.put(`/testimonials/${values.id}`, values);
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
    toast.success("Testimony deleted successfully");
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

export async function GetDashboardData() {
  try {
    const response = await api.get("/dashboard/");
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

export async function ChangePassword(
  oldPassword: string,
  newPassword: string,
  setLoading: (value: boolean) => void,
) {
  try {
    setLoading(true);
    const response = await api.post("/auth/change-password", {
      old_password: oldPassword,
      new_password: newPassword,
    });
    const data = response.data;
    toast.success("Password changed successfully");
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
