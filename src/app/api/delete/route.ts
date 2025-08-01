import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { error } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    const { id } = await request.json();


    const supabase = createRouteHandlerClient({ cookies });
 
  
    const {
    data:getClaims
    } = await supabase.auth.getClaims();

    if(!getClaims){
        return NextResponse.json({error:"Access denied: insufficient permissions."},
            {status:401}
        )
    }



  const { data, error } = await supabase
  .from("links")
  .delete()
  .eq("id", id)
  .select("*");

if (error) {
     return NextResponse.json({error: "Access Denied!"},{status:401})

} else if (!data) {
  return NextResponse.json({error
    :"No row was deleted: ID may not exist."},{status:404})
} else {
      return NextResponse.json({message:
    "Deleted Sucessfully"
  },{status:201})
  
}


    
}