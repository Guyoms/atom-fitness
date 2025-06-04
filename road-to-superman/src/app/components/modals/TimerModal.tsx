"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface TimerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TimerModal({ isOpen, onOpenChange }: TimerModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Minuterie d'Entraînement</ModalHeader>
        <ModalBody>
          {/* Timer ici */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onOpenChange(false)}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 