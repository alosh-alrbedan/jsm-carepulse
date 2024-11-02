"use client";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./ui/alert-dialog";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

const PassKeyModal = () => {
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const path = usePathname();

  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem
  ('accessKey') : null;
  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if(path) {
      if(accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY){
        setOpen(false);
        router.push('/admin');
      }
      else {
        setOpen(true);
      }
    } 
  }, [encryptedKey])
  
  
  const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem('accessKey', encryptedKey);
      setOpen(false);
    } else {
      setError('Invalid passkey. Please try again.');
    }
  }

  const closeModal = () => {
    setOpen(false);
    router.push('/');
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            {" "}
            Admin Access Verification
            <Image
              src={`/assets/icons/close.svg`}
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
              alt="close modal"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot"/>
              <InputOTPSlot index={1} className="shad-otp-slot"/>
              <InputOTPSlot index={2} className="shad-otp-slot"/>
              <InputOTPSlot index={3} className="shad-otp-slot"/>
              <InputOTPSlot index={4} className="shad-otp-slot"/>
              <InputOTPSlot index={5} className="shad-otp-slot"/>
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={(e) => validatePasskey(e)} className="shad-primary-btn w-full">
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
