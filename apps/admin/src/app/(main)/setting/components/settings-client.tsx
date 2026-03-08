'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bell,
  User,
  Shield,
  Palette,
  Lock,
  Code,
  CreditCard,
} from 'lucide-react';
import UpdateWidthWrapper from '@/components/layout/update-width-wrapper';
import SettingsGeneral from './settings-client-general';
import SettingsSecurity from './settings-client-security';
import SettingsAppearance from './settings-client-appearance';
import SettingsNotification from './settings-client-notification';
import SettingsKey from './settings-client-key';
import SettingsDanger from './settings-client-danger';
import DetailHeader from '@/components/layout/detail-header';
import SettingsHeader from './settings-header';

export function SettingsClient() {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', icon: User, title: 'General & Profile' },
    { id: 'security', icon: Shield, title: 'Security & Access' },
    { id: 'preferences', icon: Palette, title: 'Appearance & Data' },
    { id: 'notifications', icon: Bell, title: 'Notifications' },
    { id: 'api', icon: Code, title: 'API Keys' },
    { id: 'billing', icon: CreditCard, title: 'Billing & Plans' },
    { id: 'danger', icon: Lock, title: 'Danger Zone' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const SectionHeader = ({
    id,
    title,
  }: {
    id: string;
    icon: React.ElementType;
    title: string;
  }) => (
    <div id={id} className="pt-10 mb-6 flex items-center gap-3">
      <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
    </div>
  );

  const renderProfileSettings = () => <SettingsGeneral />;

  const renderSecuritySettings = () => <SettingsSecurity />;

  const renderPreferencesSettings = () => <SettingsAppearance />;

  const renderNotificationsSettings = () => <SettingsNotification />;

  const renderAPISettings = () => <SettingsKey />;

  const renderBillingSettings = () => (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="max-w-lg">
            <p className="font-medium">Current Plan: Pro Tier</p>
            <p className="text-sm text-muted-foreground">
              Your current plan includes unlimited apps and priority support.
              Billed monthly.
            </p>
          </div>
          <Button className="mt-3 md:mt-0">Manage Subscription</Button>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="max-w-lg">
            <p className="font-medium">Payment Method</p>
            <p className="text-sm text-muted-foreground">
              Visa ending in **** 4242
            </p>
          </div>
          <Button variant="outline" className="mt-3 md:mt-0">
            Update Card
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderDangerZone = () => <SettingsDanger />;

  return (
    <UpdateWidthWrapper>
      <DetailHeader />
      <SettingsHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Side Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'default' : 'ghost'}
                className="w-full rounded-full justify-start gap-3 text-base"
                onClick={() => scrollToSection(section.id)}
              >
                <section.icon className="w-5 h-5" />
                {section.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-12">
          <SectionHeader id="profile" icon={User} title="General & Profile" />
          {renderProfileSettings()}

          <SectionHeader
            id="security"
            icon={Shield}
            title="Security & Access"
          />
          {renderSecuritySettings()}

          <SectionHeader
            id="preferences"
            icon={Palette}
            title="Appearance & Data"
          />
          {renderPreferencesSettings()}

          <SectionHeader id="notifications" icon={Bell} title="Notifications" />
          {renderNotificationsSettings()}

          <SectionHeader id="api" icon={Code} title="API Keys" />
          {renderAPISettings()}

          <SectionHeader
            id="billing"
            icon={CreditCard}
            title="Billing & Plans"
          />
          {renderBillingSettings()}

          <SectionHeader id="danger" icon={Lock} title="Danger Zone" />
          {renderDangerZone()}
        </div>
      </div>
    </UpdateWidthWrapper>
  );
}
