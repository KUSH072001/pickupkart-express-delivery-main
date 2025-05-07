
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UpiPaymentFormProps {
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UpiPaymentForm: React.FC<UpiPaymentFormProps> = ({ value, error, onChange }) => (
  <div className="space-y-1">
    <Label htmlFor="upi_id">UPI ID</Label>
    <Input
      id="upi_id"
      name="upi_id"
      type="text"
      placeholder="name@upi"
      value={value}
      onChange={onChange}
      className={`transition-shadow ${error ? "border-destructive ring-2 ring-destructive/60" : "focus:ring-primary/50"}`}
      required
    />
    {error && (
      <div className="text-xs text-destructive ml-1">{error}</div>
    )}
    <div className="mt-2 text-xs text-muted-foreground">
      <b>Test UPI:</b> <span className="font-mono">testuser@upi</span>
    </div>
  </div>
);

export default UpiPaymentForm;
