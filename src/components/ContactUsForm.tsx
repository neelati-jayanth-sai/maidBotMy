import { FC } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const ContactUsForm: FC = () => {
  return (
    <div className="flex flex-col bg-accent p-28 rounded gap-8">
      <h1 className="text-cyan-50 text-4xl font-bold text-center">
        Contact Us Directly From Here
      </h1>
      <div className="flex gap-8">
        <Input required placeholder="First Name" />
        <Input required placeholder="Last Name" />
      </div>
      <div className="flex gap-8">
        <Input required placeholder="Email" type="email" />
        <Input required placeholder="Phone Number" type="number" />
      </div>
      <div>
        <textarea
          required
          placeholder="Message"
          cols={40}
          rows={5}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div>
        <Button variant="secondary">Submit</Button>
      </div>
    </div>
  );
};
