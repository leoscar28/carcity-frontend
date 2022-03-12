import User from '/repositories/user/user';
import City from '/repositories/city/city';
import Timezone from '/repositories/timezone/timezone';
import Branch from '/repositories/branch/branch';
import Facility from '/repositories/facility/facility';
import Image from '/repositories/image/image';
import RequestApproval from '/repositories/requestApproval/requestApproval';
import Department from '/repositories/department/department';
import Company from '/repositories/company/company';
import TenantCompany from "@/repositories/tenantCompany/tenantCompany";
import Room from "@/repositories/room/room";
import ExportReason from "@/repositories/exportReason/exportReason";
import Request from "@/repositories/request/request";
import RequestQueue from "@/repositories/requestQueue/requestQueue"
export const repository = ($axios) => ({
  user: User($axios),
  city: City($axios),
  timezone: Timezone($axios),
  branch: Branch($axios),
  facility: Facility($axios),
  image: Image($axios),
  requestApproval: RequestApproval($axios),
  department: Department($axios),
  company: Company($axios),
  tenantCompany: TenantCompany($axios),
  room: Room($axios),
  exportReason: ExportReason($axios),
  request: Request($axios),
  requestQueue: RequestQueue($axios),
})
