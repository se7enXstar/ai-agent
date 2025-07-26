import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Hotel' },
      update: {},
      create: {
        name: 'Hotel',
        description: 'Hotel-related tickets'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Restaurant' },
      update: {},
      create: {
        name: 'Restaurant',
        description: 'Restaurant-related tickets'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Campaign' },
      update: {},
      create: {
        name: 'Campaign',
        description: 'Campaign-related tickets'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Critical' },
      update: {},
      create: {
        name: 'Critical',
        description: 'Critical issues requiring immediate attention'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Feature Request' },
      update: {},
      create: {
        name: 'Feature Request',
        description: 'New feature requests'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Performance' },
      update: {},
      create: {
        name: 'Performance',
        description: 'Performance-related issues'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Security' },
      update: {},
      create: {
        name: 'Security',
        description: 'Security-related issues'
      }
    }),
    prisma.category.upsert({
      where: { name: 'UI/UX' },
      update: {},
      create: {
        name: 'UI/UX',
        description: 'User interface and experience issues'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Support' },
      update: {},
      create: {
        name: 'Support',
        description: 'General support requests'
      }
    })
  ])

  console.log('✅ Categories created:', categories.length)

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin'
      }
    }),
    prisma.user.upsert({
      where: { username: 'user1' },
      update: {},
      create: {
        username: 'user1'
      }
    }),
    prisma.user.upsert({
      where: { username: 'user2' },
      update: {},
      create: {
        username: 'user2'
      }
    })
  ])

  console.log('✅ Users created:', users.length)

  // Create sample tickets
  const tickets = await Promise.all([
    prisma.ticket.create({
      data: {
        title: 'Bug Report: Login Issue',
        description: 'Users are unable to log in to the system after entering correct credentials. This issue affects all user types and occurs across different browsers. The login form accepts the credentials but fails to authenticate properly.',
        summary: 'Critical login functionality broken for all users',
        categoryId: categories.find(c => c.name === 'Critical')!.id,
        userId: users[0].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'Feature Request: Dark Mode',
        description: 'Add dark mode theme option for better user experience in low-light environments. This should include a toggle in the user settings and remember the user\'s preference across sessions.',
        summary: 'Request for dark theme implementation',
        categoryId: categories.find(c => c.name === 'Feature Request')!.id,
        userId: users[1].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'Performance Issue: Slow Loading',
        description: 'Dashboard takes more than 10 seconds to load on mobile devices. The issue is particularly noticeable on slower network connections and older devices. Initial page load and subsequent navigation are both affected.',
        summary: 'Mobile dashboard performance degradation',
        categoryId: categories.find(c => c.name === 'Performance')!.id,
        userId: users[2].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'Security Vulnerability: XSS',
        description: 'Cross-site scripting vulnerability found in comment section. Users can inject malicious scripts through the comment form. This poses a significant security risk and needs immediate attention.',
        summary: 'Critical security issue requiring immediate attention',
        categoryId: categories.find(c => c.name === 'Security')!.id,
        userId: users[0].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'UI Bug: Button Alignment',
        description: 'Submit button is misaligned on the contact form page. The button appears to be shifted to the right and doesn\'t align properly with the form fields. This affects the visual consistency of the interface.',
        summary: 'Minor UI alignment issue',
        categoryId: categories.find(c => c.name === 'UI/UX')!.id,
        userId: users[1].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'Database Connection Error',
        description: 'Application cannot connect to the database server. This is causing complete system downtime and preventing all database operations. Error logs indicate connection timeout issues.',
        summary: 'Database connectivity issue affecting all operations',
        categoryId: categories.find(c => c.name === 'Critical')!.id,
        userId: users[2].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'Email Notification Failure',
        description: 'Email notifications are not being sent to users. The email service appears to be down or misconfigured. Users are not receiving important system notifications and updates.',
        summary: 'Email service disruption',
        categoryId: categories.find(c => c.name === 'Support')!.id,
        userId: users[0].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'Mobile Responsiveness Issue',
        description: 'Website layout breaks on mobile devices with screen width less than 768px. Elements are overlapping, text is unreadable, and navigation becomes unusable on smaller screens.',
        summary: 'Mobile responsive design problem',
        categoryId: categories.find(c => c.name === 'UI/UX')!.id,
        userId: users[1].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'API Rate Limiting',
        description: 'API endpoints are hitting rate limits too frequently. This is causing intermittent failures for users making multiple requests. The current rate limiting configuration appears to be too restrictive.',
        summary: 'API performance optimization needed',
        categoryId: categories.find(c => c.name === 'Performance')!.id,
        userId: users[2].id
      }
    }),
    prisma.ticket.create({
      data: {
        title: 'User Permission Error',
        description: 'Users cannot access features they should have permission for. The permission system is incorrectly denying access to authorized users. This affects user productivity and system usability.',
        summary: 'Permission system malfunction',
        categoryId: categories.find(c => c.name === 'Security')!.id,
        userId: users[0].id
      }
    })
  ])

  console.log('✅ Tickets created:', tickets.length)
  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 