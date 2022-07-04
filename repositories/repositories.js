import User from '/repositories/user/user';

import Completion from "~/repositories/completion/completion";
import CompletionDate from "~/repositories/completionDate/completionDate";
import CompletionStatus from "~/repositories/completionStatus/completionStatus";
import CompletionSignature from "@/repositories/completionSignature/completionSignature";

import Application from "@/repositories/application/application";
import ApplicationDate from "~/repositories/applicationDate/applicationDate";
import ApplicationStatus from "~/repositories/applicationStatus/applicationStatus";
import ApplicationSignature from "~/repositories/applicationSignature/applicationSignature";

import Invoice from "@/repositories/invoice/invoice";
import InvoiceDate from "~/repositories/invoiceDate/invoiceDate";
import InvoiceStatus from "~/repositories/invoiceStatus/invoiceStatus";

import Notification from "~/repositories/notification/notification";
import NotificationTenant from "@/repositories/notificationTenant/notificationTenant";

import Room from "~/repositories/room/room";

import Slider from "~/repositories/slider/slider";
import SliderDetail from "~/repositories/sliderDetail/sliderDetail";

import About from "~/repositories/about/about";
import AboutOption from "@/repositories/aboutOption/aboutOption";

import Infrastructure from "@/repositories/infrastructure/infrastructure";
import InfrastructureOption from "@/repositories/infrastructureOption/infrastructureOption";

import VehicleMaintenance from "@/repositories/vehicleMaintenance/vehicleMaintenance";

import Contact from "@/repositories/contact/contact";

export const repository = ($axios) => ({
  user: User($axios),

  completion: Completion($axios),
  completionDate: CompletionDate($axios),
  completionStatus: CompletionStatus($axios),
  completionSignature: CompletionSignature($axios),

  application: Application($axios),
  applicationDate: ApplicationDate($axios),
  applicationStatus: ApplicationStatus($axios),
  applicationSignature: ApplicationSignature($axios),

  invoice: Invoice($axios),
  invoiceDate: InvoiceDate($axios),
  invoiceStatus: InvoiceStatus($axios),

  notification: Notification($axios),
  notificationTenant: NotificationTenant($axios),

  room: Room($axios),

  slider: Slider($axios),
  sliderDetail: SliderDetail($axios),

  about: About($axios),
  aboutOption: AboutOption($axios),

  infrastructure: Infrastructure($axios),
  infrastructureOption: InfrastructureOption($axios),

  vehicleMaintenance: VehicleMaintenance($axios),

  contact: Contact($axios),
})
