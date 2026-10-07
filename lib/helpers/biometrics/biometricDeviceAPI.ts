export type DeviceType = "fingerprint" | "facerecognition" | "multi";

export interface BiometricDevicePayload {
  deviceId?: string;
  gymId: string;
  deviceName: string;
  deviceSerialNumber: string;
  deviceIp: string;
  devicePort: number;
  deviceUsername?: string;
  devicePassword?: string;
  deviceType: DeviceType;
  isActive?: boolean;
  is_deleted?: boolean;
  createdBy: string;
  gateDirection?: string;
  deviceModel?: string;
  firmwareVersion?: string;
}

export interface BiometricDeviceRow {
  deviceId: string;
  gymId: string;
  deviceName: string;
  deviceSerialNumber: string;
  deviceIp: string;
  devicePort: number;
  deviceUsername?: string | null;
  devicePassword?: string | null;
  deviceType: DeviceType;
  lastHeartbeat: string | null;
  isOnline: boolean;
  isActive: boolean;
  is_deleted: boolean;
  createdBy: string;
  gateDirection?: string | null;
  deviceModel?: string | null;
  firmwareVersion?: string | null;
  createdAt: string;
}

export const getBiometricDevices = async (gymId: string, page?: number, limit?: number, status: 'active' | 'inactive' = 'active') => {
  try {
    const { createClient } = await import('@/app/api/supabase/client');
    const supabaseAuth = createClient();

    let query = supabaseAuth
      .from("gym_biometric_devices")
      .select("*", { count: 'exact' })
      .eq("gymId", gymId)
      .order("createdAt", { ascending: false });

    if (status === 'active') {
      query = query.eq("is_deleted", false).is("deletedAt", null);
    } else if (status === 'inactive') {
      query = query.eq("is_deleted", true).eq("isActive", false).not("deletedAt", "is", null);
    }

    if (page !== undefined && limit !== undefined) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;
    if (error) throw error;
    return { success: true, data: data as BiometricDeviceRow[], total: count || 0 };
  } catch (error: any) {
    console.error('[Biometric API] getBiometricDevices error:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const upsertBiometricDevice = async (payload: BiometricDevicePayload) => {
  try {
    const { createClient } = await import('@/app/api/supabase/client');
    const supabaseAuth = createClient();

    const now = new Date().toISOString();

    const deviceData = {
      gymId: payload.gymId,
      deviceName: payload.deviceName.trim(),
      deviceSerialNumber: payload.deviceSerialNumber.trim(),
      deviceIp: payload.deviceIp.trim(),
      devicePort: payload.devicePort || 4370,
      deviceUsername: payload.deviceUsername?.trim() || null,
      devicePassword: payload.devicePassword?.trim() || null,
      deviceType: payload.deviceType,
      gateDirection: payload.gateDirection?.trim() || null,
      deviceModel: payload.deviceModel?.trim() || null,
      firmwareVersion: payload.firmwareVersion?.trim() || null,
      isActive: payload.isActive ?? true,
      is_deleted: payload.is_deleted ?? false,
      createdBy: payload.createdBy,
      updatedAt: now,
    };

    if (payload.deviceId) {
      const { data, error } = await supabaseAuth
        .from("gym_biometric_devices")
        .update(deviceData)
        .eq("deviceId", payload.deviceId)
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    } else {
      const newDeviceId = crypto.randomUUID();
      const { data, error } = await supabaseAuth
        .from("gym_biometric_devices")
        .insert([{ ...deviceData, deviceId: newDeviceId, createdAt: now }])
        .select();

      if (error) throw error;
      return { success: true, data: data[0] };
    }
  } catch (error: any) {
    console.error('[Biometric API] upsertBiometricDevice error:', error);
    return { success: false, error: error.message };
  }
};

export const deleteBiometricDevice = async (deviceId: string) => {
  try {
    const { createClient } = await import('@/app/api/supabase/client');
    const supabaseAuth = createClient();

    const now = new Date().toISOString();
    const { error } = await supabaseAuth
      .from("gym_biometric_devices")
      .update({ isActive: false, is_deleted: true, deletedAt: now })
      .eq("deviceId", deviceId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('[Biometric API] deleteBiometricDevice error:', error);
    return { success: false, error: error.message };
  }
};

export const restoreBiometricDevice = async (deviceId: string) => {
  try {
    const { createClient } = await import('@/app/api/supabase/client');
    const supabaseAuth = createClient();

    const { error } = await supabaseAuth
      .from("gym_biometric_devices")
      .update({ isActive: true, is_deleted: false, deletedAt: null })
      .eq("deviceId", deviceId);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('[Biometric API] restoreBiometricDevice error:', error);
    return { success: false, error: error.message };
  }
};
