type GetParams = {
    params: {
      filename: string;
    };
  };
  
  // export an async GET function. This is a convention in NextJS
  export async function GET(req: Request, { params }: GetParams) {
    // filename for the file that the user is trying to download
    const filename = extractSlug(params.filename);
  
    // external file URL
    const FULL_URL = params.filename;
  
    // use fetch to get a response
    const response = await fetch(FULL_URL);
  
    // return a new response but use 'content-disposition' to suggest saving the file to the user's computer
    return new Response(response.body, {
      headers: {
        ...response.headers, // copy the previous headers
        "content-disposition": `attachment; filename="${filename}"`,
      },
    });
  }  

  function extractSlug(url: string) {
    const parts = url.split("/");
    return parts[parts.length - 1];
  }

  // MIHAI: deprecated for now but to find a way to add url here so we don't expose our download link on the front end
  // Mihai TO DO above after talking to Hamzah