import type Carrier from './Carrier';

interface Package {
    id: string;
    trackingNumber: string;
    carrier: Carrier;
}

export default Package;
