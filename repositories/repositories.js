import User from '/repositories/user/user';

import Completion from "~/repositories/completion/completion";
import CompletionDate from "~/repositories/completionDate/completionDate";
import CompletionStatus from "~/repositories/completionStatus/completionStatus";

import Application from "@/repositories/application/application";
import ApplicationDate from "~/repositories/applicationDate/applicationDate";
import ApplicationStatus from "~/repositories/applicationStatus/applicationStatus";
import ApplicationSignature from "~/repositories/applicationSignature/applicationSignature";

import Invoice from "@/repositories/invoice/invoice";
import InvoiceDate from "~/repositories/invoiceDate/invoiceDate";
import InvoiceStatus from "~/repositories/invoiceStatus/invoiceStatus";

import Notification from "~/repositories/notification/notification";

export const repository = ($axios) => ({
  user: User($axios),

  completion: Completion($axios),
  completionDate: CompletionDate($axios),
  completionStatus: CompletionStatus($axios),

  application: Application($axios),
  applicationDate: ApplicationDate($axios),
  applicationStatus: ApplicationStatus($axios),
  applicationSignature: ApplicationSignature($axios),

  invoice: Invoice($axios),
  invoiceDate: InvoiceDate($axios),
  invoiceStatus: InvoiceStatus($axios),

  notification: Notification($axios),
})
