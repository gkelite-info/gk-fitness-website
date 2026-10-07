"use server";

import {
  registerUserOnDevice,
  deleteUserOnDevice,
  captureFingerprintOnDevice,
  uploadFaceToDevice,
  deleteFaceFromDevice,
  RegisterUserParams,
  DeleteUserParams,
  UploadFingerprintParams,
  UploadFaceParams
} from "@/lib/helpers/biometrics/biometricAPIs";

export const serverRegisterUserOnDevice = async (params: RegisterUserParams) => {
  try {
    const res = await registerUserOnDevice(params);
    return res;
  } catch (error: any) {
    console.error("❌ [SERVER ACTION] registerUserOnDevice FAILED:", error?.message || error);
    throw new Error(error?.message || "Failed to register user on device");
  }
};

export const serverDeleteUserOnDevice = async (params: DeleteUserParams) => {
  try {
    const res = await deleteUserOnDevice(params);
    return res;
  } catch (error: any) {
    console.error("❌ [SERVER ACTION] deleteUserOnDevice FAILED:", error?.message || error);
    throw new Error(error?.message || "Failed to delete user on device");
  }
};

export const serverCaptureFingerprintOnDevice = async (params: UploadFingerprintParams) => {
  try {
    const res = await captureFingerprintOnDevice(params);
    return res;
  } catch (error: any) {
    console.error("❌ [SERVER ACTION] captureFingerprintOnDevice FAILED:", error?.message || error);
    throw new Error(error?.message || "Failed to capture fingerprint on device");
  }
};

export const serverUploadFaceToDevice = async (params: UploadFaceParams) => {
  try {
    const res = await uploadFaceToDevice(params);
    return res;
  } catch (error: any) {
    console.error("❌ [SERVER ACTION] uploadFaceToDevice FAILED:", error?.message || error);
    throw new Error(error?.message || "Failed to upload face to device");
  }
};

export const serverDeleteFaceFromDevice = async (params: DeleteUserParams) => {
  try {
    const res = await deleteFaceFromDevice(params);
    return res;
  } catch (error: any) {
    console.error("❌ [SERVER ACTION] deleteFaceFromDevice FAILED:", error?.message || error);
    throw new Error(error?.message || "Failed to delete face from device");
  }
};

import { syncDeviceLogs } from '@/lib/helpers/biometrics/biometricScanHelper';
import { createClient } from '@/app/api/supabase/server';

export const serverSyncGymLogs = async (gymId: string) => {
  try {
    const supabase = await createClient();

    const { data: devices } = await supabase
      .from('gym_biometric_devices')
      .select('deviceId')
      .eq('gymId', gymId)
      .eq('is_deleted', false);

    if (!devices || devices.length === 0) {
      return { success: true, message: 'No devices', totalSynced: 0 };
    }

    let totalSynced = 0;
    for (const dev of devices) {
      const res = await syncDeviceLogs(supabase, dev.deviceId);
      if (res.success) {
        totalSynced += (res.successfullySynced || 0);
      }
    }

    return { success: true, totalSynced };
  } catch (error: any) {
    console.error('? [SERVER ACTION] serverSyncGymLogs FAILED:', error?.message || error);
    throw new Error(error?.message || 'Failed to sync gym logs');
  }
};
