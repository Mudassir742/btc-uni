import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { userHandler } from '@/features/login/userHandler';
// Iron Session
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '@/features/login/iron-session';

const handler: NextApiHandler = async ( req: NextApiRequest, res: NextApiResponse ) => {
	return userHandler( req, res );
};

export default withIronSessionApiRoute(handler, ironOptions);
