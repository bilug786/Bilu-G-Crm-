import prisma from './prisma'

export async function logAudit(userId: string, action: string, entity: string, entityId: string, details?: string) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details,
      },
    })
  } catch (error) {
    console.error('Failed to create audit log:', error)
  }
}

export async function logActivity(userId: string, activity: string) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        activity,
      },
    })
  } catch (error) {
    console.error('Failed to create activity log:', error)
  }
}
