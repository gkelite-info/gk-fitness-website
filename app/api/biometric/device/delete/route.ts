import { NextResponse } from 'next/server';
import { createClient } from '@/app/api/supabase/server';
import { deleteUserOnDevice } from '@/lib/helpers/biometrics/biometricAPIs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { credentialId, gymId, deviceUserId } = body;

    if (!credentialId || !gymId) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: credential, error: credError } = await supabase
      .from('gym_biometric_credentials')
      .select('*')
      .eq('credentialId', credentialId)
      .single();

    if (credError && credError.code !== 'PGRST116') {
      console.error("[Device Delete API] Error fetching credential:", credError);
    }

    const targetDeviceUserId = deviceUserId || credential?.deviceUserId;
    const targetDeviceId = credential?.deviceId;

    if (targetDeviceId && targetDeviceUserId) {
      const { data: device } = await supabase
        .from('gym_biometric_devices')
        .select('*')
        .eq('deviceId', targetDeviceId)
        .eq('gymId', gymId)
        .single();

      if (device) {
        try {
          await deleteUserOnDevice({
            ip: device.deviceIp,
            port: device.devicePort,
            devIndex: device.deviceId,
            username: device.deviceUsername || undefined,
            password: device.devicePassword || undefined,
            employeeNo: targetDeviceUserId
          });
        } catch (deviceErr: any) {
          console.error("[Device Delete API] Failed to delete from device:", deviceErr);
        }
      }
    }

    const now = new Date().toISOString();
    const { error: deleteError } = await supabase
      .from("gym_biometric_credentials")
      .update({ is_deleted: true, deletedAt: now })
      .eq("credentialId", credentialId)
      .eq("gymId", gymId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json(
      { success: true, message: "User deleted from device and credentials table successfully." },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("[Device Delete API] Unhandled error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
