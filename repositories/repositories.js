import User from '/repositories/user/user';

import Completion from "~/repositories/completion/completion";
import CompletionDate from "~/repositories/completionDate/completionDate";
import CompletionStatus from "~/repositories/completionStatus/completionStatus";

import ApplicationDate from "~/repositories/applicationDate/applicationDate";
import ApplicationStatus from "~/repositories/applicationStatus/applicationStatus";

import InvoiceDate from "~/repositories/invoiceDate/invoiceDate";
import InvoiceStatus from "~/repositories/invoiceStatus/invoiceStatus";

export const repository = ($axios) => ({
  user: User($axios),

  completion: Completion($axios),
  completionDate: CompletionDate($axios),
  completionStatus: CompletionStatus($axios),

  applicationDate: ApplicationDate($axios),
  applicationStatus: ApplicationStatus($axios),

  invoiceDate: InvoiceDate($axios),
  invoiceStatus: InvoiceStatus($axios)
})
