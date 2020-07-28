import type Carrier from './Carrier';

interface TrackingInfo {
    trackingNumber: string;
    carrier: Carrier;
}

export default TrackingInfo;
