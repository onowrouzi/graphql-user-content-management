import Services from "./services";

export default interface Context {
  req: any;
  services: Services;
  userId: string;
}
