/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form";
import axios from "axios"
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

const api = "http://localhost:8000"

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

export async function HeroFooterUpdate(values: current, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const name = values.name
    const amount = values.amount
    const response = await axios.patch(`${api}/${name}`, {amount: amount})
    const data = response.data
    toast.success(`${name} updated successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function CreateService(values: services, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.post(`${api}/Service`, values)
    const data = response.data
    toast.success(`${values.title} created successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function GetService() {
  try {
    const response = await axios.get(`${api}/Service`)
    const data = response.data
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function UpdateService(id: number, values: services, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.patch(`${api}/Service/${id}`, values)
    const data = response.data
    toast.success(`${values.title} updated successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function DeleteService(id: number) {
  try {
    const response = await axios.delete(`${api}/Service/${id}`)
    const data = response.data
    toast.success(`${data.title} deleted successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function CreatePortFolio(values: portfolio, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.post(`${api}/Portfolio`, values)
    const data = response.data
    toast.success(`${values.title} created successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function GetPortFolio() {
  try {
    const response = await axios.get(`${api}/Portfolio`)
    const data = response.data
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function UpdatePortFolio(id: number, values: portfolio, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.patch(`${api}/Portfolio/${id}`, values)
    const data = response.data
    toast.success(`${values.title} updated successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function DeletePortFolio(id: number) {
  try {
    const response = await axios.delete(`${api}/Portfolio/${id}`)
    const data = response.data
    toast.success(`${data.title} deleted successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function CreateBlog(values: blogs, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.post(`${api}/Blog`, values)
    const data = response.data
    toast.success(`${values.title} created successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function GetBlog() {
  try {
    const response = await axios.get(`${api}/Blog`)
    const data = response.data
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function UpdateBlog(id: number, values: blogs, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.patch(`${api}/Blog/${id}`, values)
    const data = response.data
    toast.success(`${values.title} updated successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function DeleteBlog(id: number) {
  try {
    const response = await axios.delete(`${api}/Blog/${id}`)
    const data = response.data
    toast.success(`${data.title} deleted successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function CreateTeam(values: teamprop, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.post(`${api}/Team`, values)
    const data = response.data
    toast.success(`${values.name} created successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function GetTeam() {
  try {
    const response = await axios.get(`${api}/Team`)
    const data = response.data
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function UpdateTeam(id: number, values: teamprop, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.patch(`${api}/Team/${id}`, values)
    const data = response.data
    toast.success(`${values.name} updated successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function DeleteTeam(id: number) {
  try {
    const response = await axios.delete(`${api}/Team/${id}`)
    const data = response.data
    toast.success(`${data.name} deleted successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function CreatePartner(values: partner, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.post(`${api}/Partner`, values)
    const data = response.data
    toast.success(`${values.title} created successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function GetPartner() {
  try {
    const response = await axios.get(`${api}/Partner`)
    const data = response.data
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function UpdatePartner(id: number, values: partner, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.patch(`${api}/Partner/${id}`, values)
    const data = response.data
    toast.success(`${values.title} updated successfully`) 
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function DeletePartner(id: number) {
  try {
    const response = await axios.delete(`${api}/Partner/${id}`)
    const data = response.data
    toast.success(`${data.title} deleted successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function CreateContact(values: contact, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.post(`${api}/Contact`, values)
    const data = response.data
    toast.success(`Message Sent successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function GetContact() {
  try {
    const response = await axios.get(`${api}/Contact`)
    const data = response.data
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function DeleteContact(id: number) {
  try {
    const response = await axios.delete(`${api}/Contact/${id}`)
    const data = response.data
    toast.success(`Message deleted successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function CreateTestimonial(values: testimony, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.post(`${api}/Testimonial`, values)
    const data = response.data
    toast.success(`${values.name} created successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function GetTestimonial() {
  try {
    const response = await axios.get(`${api}/Testimonial`)
    const data = response.data
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}

export async function UpdateTestimonial(id: number, values: testimony, setLoading: (value: boolean) => void) {
  try {
    setLoading(true)
    const response = await axios.patch(`${api}/Testimonial/${id}`, values)
    const data = response.data
    toast.success(`${values.name} updated successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }finally {
    setLoading(false)
  }
}

export async function DeleteTestimonial(id: number) {
  try {
    const response = await axios.delete(`${api}/Testimonial/${id}`)
    const data = response.data
    toast.success(`${data.name} deleted successfully`)
    return data
  } catch (error: unknown) {
    let errorMessage = "An Unknown Error happened"
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message
    }else if(error instanceof Error) {
      errorMessage = error.message
    }
    toast.error(`${errorMessage}`)
  }
}