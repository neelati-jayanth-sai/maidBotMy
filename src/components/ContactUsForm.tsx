"use client";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Min length 2",
  }),
  lastName: z.string().min(2, {
    message: "Min length 2",
  }),
  message: z.string().min(10, {
    message: "Min length 10",
  }),
  email: z.string().email({
    message: "Email format incorrect",
  }),
  mobileNumber: z.string().min(10, {
    message: "Min length 10",
  }),
});

export const ContactUsForm: FC = () => {
  // Loading State
  const [loading, setLoading] = useState<boolean>(false);

  // Toast hook
  const { toast } = useToast();

  // Submit Button
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/messages`,
      {
        method: "POST",
        body: JSON.stringify(values),
      }
    );
    const result = response.json();
    console.log({ result });
    toast({
      variant: "success",
      description: "Message Sent Successfully!",
    });
    setLoading(false);
  }

  // Useform Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      message: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col bg-accent p-28 rounded gap-8">
          <h1 className="text-4xl font-bold text-center">
            Contact Us Directly From Here
          </h1>
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="last Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile Number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Message"
                      cols={40}
                      rows={5}
                      {...field}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button disabled={loading}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
