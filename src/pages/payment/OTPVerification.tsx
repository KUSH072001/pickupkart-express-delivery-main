
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast as showToast } from "@/hooks/use-toast";
import { Loader, Check, X } from "lucide-react";

// Mock OTP
const MOCK_OTP = "123456";

const OTPVerification: React.FC = () => {
  const { state } = useLocation() as {
    state: {
      orderId: number;
      amount: number;
      paymentMethod: string;
      cardName?: string;
      cardNumber?: string;
    }
  };
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  useEffect(() => {
    // Prefill with mock or from clipboard in real app
    setOtp(MOCK_OTP);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("verifying");
    setTimeout(() => {
      if (otp === MOCK_OTP) {
        setStatus("success");
        showToast({
          title: "Payment Success 🎉",
          description: "Your payment was successful.",
        });
        setTimeout(() => navigate("/dashboard/my-orders"), 1500);
      } else {
        setStatus("error");
        showToast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect.",
          variant: "destructive"
        });
      }
    }, 1200);
  };

  return (
    <div className="flex justify-center items-center min-h-[65vh]">
      <Card className="w-[345px] animate-fade-in">
        <CardHeader>
          <CardTitle>Verify Payment OTP</CardTitle>
          <CardDescription>
            Enter the OTP sent to your registered mobile/email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleVerify}>
            <div className="flex flex-col gap-2">
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={status === "verifying" || status === "success"}
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={status === "verifying" || status === "success"}
            >
              {status === "verifying" ? (
                <span className="flex items-center"><Loader className="animate-spin mr-1 h-4 w-4" />Verifying...</span>
              ) : (
                "Submit OTP"
              )}
            </Button>
            {status === "success" && (
              <div className="flex gap-1 items-center mt-3 text-green-600 text-sm">
                <Check className="h-4 w-4" /> Payment Successful!
              </div>
            )}
            {status === "error" && (
              <div className="flex gap-1 items-center mt-3 text-destructive text-sm">
                <X className="h-4 w-4" /> Incorrect OTP, please try again.
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
