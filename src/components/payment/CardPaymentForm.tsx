
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CardPaymentFormProps {
  formData: {
    card_name: string;
    card_number: string;
    card_expiry: string;
    card_cvv: string;
  };
  errors: { [k: string]: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({ formData, errors, onChange }) => (
  <div className="space-y-3">
    <div className="space-y-1">
      <Label htmlFor="card_name">Name on Card</Label>
      <Input
        id="card_name"
        name="card_name"
        type="text"
        autoComplete="cc-name"
        maxLength={40}
        placeholder="Cardholder Name"
        value={formData.card_name}
        onChange={onChange}
        className={`transition-shadow ${errors.card_name ? "border-destructive ring-2 ring-destructive/60" : "focus:ring-primary/50"}`}
        required
      />
      {errors.card_name && (
        <div className="text-xs text-destructive ml-1">{errors.card_name}</div>
      )}
    </div>
    <div className="space-y-1">
      <Label htmlFor="card_number">Card Number</Label>
      <Input
        id="card_number"
        name="card_number"
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        pattern="[0-9\s]{13,19}"
        placeholder="1234 5678 9012 3456"
        maxLength={16}
        value={formData.card_number}
        onChange={onChange}
        className={`transition-shadow ${errors.card_number ? "border-destructive ring-2 ring-destructive/60" : "focus:ring-primary/50"}`}
        required
      />
      {errors.card_number && (
        <div className="text-xs text-destructive ml-1">{errors.card_number}</div>
      )}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <Label htmlFor="card_expiry">Expiry Date</Label>
        <Input
          id="card_expiry"
          name="card_expiry"
          type="text"
          autoComplete="cc-exp"
          placeholder="MM/YY"
          maxLength={5}
          value={formData.card_expiry}
          onChange={onChange}
          className={`transition-shadow ${errors.card_expiry ? "border-destructive ring-2 ring-destructive/60" : "focus:ring-primary/50"}`}
          required
        />
        {errors.card_expiry && (
          <div className="text-xs text-destructive ml-1">{errors.card_expiry}</div>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="card_cvv">CVV</Label>
        <Input
          id="card_cvv"
          name="card_cvv"
          type="password"
          maxLength={3}
          autoComplete="cc-csc"
          placeholder="123"
          value={formData.card_cvv}
          onChange={onChange}
          className={`transition-shadow ${errors.card_cvv ? "border-destructive ring-2 ring-destructive/60" : "focus:ring-primary/50"}`}
          required
        />
        {errors.card_cvv && (
          <div className="text-xs text-destructive ml-1">{errors.card_cvv}</div>
        )}
      </div>
    </div>
    <div className="mt-2 text-xs text-muted-foreground">
      <p>
        <b>Test Cards:</b> <br />
        Card Number: <span className="font-mono">4111 1111 1111 1111</span> <br />
        Exp: <span className="font-mono">12/30</span> CVV: <span className="font-mono">123</span>
      </p>
    </div>
  </div>
);

export default CardPaymentForm;
