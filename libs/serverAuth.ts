import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from './prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    // const session = await getSession({req});
    const session = await getServerSession(req, res, authOptions);
    if(!session?.user?.email) {
        throw new Error('Not signed in')
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email.trim() },
    });

    if(!currentUser) {
        throw new Error('Not signed in')
    }

    return {currentUser}
}

export default serverAuth;