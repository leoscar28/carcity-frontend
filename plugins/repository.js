import { repository } from "/repositories/repositories";

export default (context, inject) => {
  inject('repository', repository(context.$axios));
}
