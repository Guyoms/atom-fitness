"use client";
import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface DayModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DayModal({ isOpen, onOpenChange }: DayModalProps) {
  const { userData, setCurrentDay } = useApp();
  const [value, setValue] = useState(userData.currentDay);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (value < 1 || value > 90) {
      setError("Le jour doit être compris entre 1 et 90.");
      return;
    }
    setCurrentDay(value);
    setError("");
    onOpenChange(false);
  };

  // Sync value when modal opens
  useEffect(() => {
    if (isOpen) setValue(userData.currentDay);
  }, [isOpen, userData.currentDay]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Modifier le jour actuel</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            min={1}
            max={90}
            label="Jour actuel (1-90)"
            value={value.toString()}
            onChange={e => setValue(Number(e.target.value))}
            autoFocus
          />
          {error && <div style={{ color: 'red', fontSize: 13 }}>{error}</div>}
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={() => onOpenChange(false)}>Annuler</Button>
          <Button color="primary" onPress={handleSave}>Enregistrer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 