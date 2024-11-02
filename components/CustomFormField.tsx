'use client';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import React from "react";
import Image from "next/image";

import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
    control : Control<any>; 
    FieldType : FormFieldType;
    name : string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disapled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?:React.ReactNode;
    renderSkeleton?:(field:any) => React.ReactNode;

}

const RenderField = ({field, props}: {field: any; props: CustomProps}) => {
  const {FieldType, iconSrc, iconAlt, placeholder, dateFormat, showTimeSelect, renderSkeleton} = props;
  switch (FieldType) {
    case FormFieldType.INPUT:
      return(
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image 
              src={iconSrc}
              alt={iconAlt || 'icon'}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input 
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput 
            defaultCountry="US"
            onChange={field.onChange}
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            className="input-phone"
          />
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={'/assets/icons/calendar.svg'}
            width={24}
            height={24}
            alt="calendar"
            className="mr-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName='date-picker'
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return renderSkeleton? renderSkeleton(field) : null

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea 
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disapled={props.disapled}
          />
        </FormControl>
      )
      case FormFieldType.CHECKBOX:
        return (
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox 
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label className="checkbox-label" htmlFor={props.name}>
                {props.label}
              </label>
            </div>
          </FormControl>
        )
    default:
      break;
  }
}

const CustomFormField = (props : CustomProps) => {
  const {control, FieldType, name, label} = props;
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {FieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
              )}
              <RenderField field={field} props={props}/>
              <FormMessage className="shad-error"/>
            </FormItem>
          )}
    />
  )
}

export default CustomFormField