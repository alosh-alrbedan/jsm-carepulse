"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({row}) => <p className="text-14-medium">{row.index + 1}</p>
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({row}) => <p className="text-14-medium">{row.original.patient.name}</p>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    )
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({row}) => (
      <p className="text-14-regular min-w-[100px]">{formatDateTime(row.original.schedule).dateTime}</p>
    )
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({row}) => {
      const doctor = Doctors.find((doctor) => doctor.name === row.original.primaryPhysician);
     return (
      <div className="flex gap-3 items-center">
        <Image
          src={`${doctor?.image}`}
          width={100}
          height={100}
          alt='doctor'
          className='size-8'
        /> 
        <p className="whitespace-nowrap">Dr.{doctor?.name}</p>
      </div>

     )
    }
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)
 
  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row : {original: data}}) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal 
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title='Schedule Appointment'
            description='Please confirm the following details to scheduled'
          />
          <AppointmentModal 
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title='Cancel Appointment'
            description='Are you sure you want to cancel this appointment?'
          />
       
        </div>
      )      
    },
  },
]
