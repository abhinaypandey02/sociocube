
export function GET(req) {
    const domain = req.headers.get('host')
    if (
        !domain
    )
        return Response.redirect(process.env.NEXT_PUBLIC_FRONTEND_BASE_URL||"https://sociocube.com");
    const username = domain.split(".")[0];
    return Response.redirect(process.env.NEXT_PUBLIC_FRONTEND_BASE_URL+'/profile/'+username)
}

export const config = {
    runtime: 'edge',
};