import Home from "./routes/Home.svelte";
import Profile from "./routes/Profile.svelte"
import NotFound from "./routes/NotFound.svelte";
import BucketDetail from "./routes/BucketDetail.svelte";
import TreeDetail from "./routes/TreeDetail.svelte";
import SignIn from "./routes/SignIn.svelte";
import Process from "./routes/Process.svelte";
import { wrap } from "svelte-spa-router/wrap";
import { getValue } from "./store";
import { push } from "svelte-spa-router";

const routes = {
  // Exact path
  "/": wrap(
    {component: Home,
    conditions: [
      () => {
        //console.log(getValue("AUTH"))
        if(getValue("AUTH") === "true") {
          ////console.log("fuck")
          return true
        }
        else {
          push("/login")
          return false
        }
      }
    ]}
  ),
  "/profile" : wrap(
    {component: Profile,
    conditions: [
      () => {
        //console.log(getValue("AUTH"))
        if(getValue("AUTH") === "true") {
          ////console.log("fuck")
          return true
        }
        else {
          push("/login")
          return false
        }
      }
    ]}
  ),
  "/deets/:userid/:bucketid" : BucketDetail,
  "/trees/:userid/" : TreeDetail,
  "/process" : Process,
  "/login": wrap(
    {component: SignIn,
    conditions: [
      () => {
        ////console.log("From login",getValue("AUTH"))
      
        if (getValue("AUTH") === "false"){
          ////console.log("in login, no auth")
          return true
        }else{
          push("/")
          return false;
        }
      }
    ]}
  ),
  "*": NotFound,
};

export default routes;
