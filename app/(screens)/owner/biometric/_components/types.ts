export type CredentialUser = {
  id: string;
  name: string;
  phone: string;
  deviceUserId: string | null;
  enrolledType: "fingerprint" | "face" | null;
  hasFingerprint?: boolean;
  hasFace?: boolean;
  credentials?: any[];
};

export type LogEntry = {
  id: string;
  name: string;
  phone: string;
  type: "Check In" | "Check Out";
  deviceName: string;
  authMethod: "Fingerprint" | "Face";
  scanTimeStr: string;
  scanDateStr: string;
  status: string;
  rejectReason?: string;
  timestamp: number;
};
